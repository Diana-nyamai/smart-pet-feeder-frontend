import { spawn } from "node:child_process";
import { writeFile, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";
import { config } from "dotenv";
import { FishAudioClient, play } from "fish-audio";

config({ quiet: true });

const FAILURE_LINES = {
  default: "[sighing] [disappointed] Diana… I think your cat could write better code than this.",
  supportive: "[calm] [encouraging] It’s okay. we'll fix it",
  chaotic: "[excited] Ship it anyway!",
};

const SUCCESS_LINE = "[excited] All pet feeder tests passed! Finally.";
const S2_PRO_BACKEND = "s2.1-pro-free";

function getPersonality(args) {
  const option = args.find((arg) => arg.startsWith("--personality="));
  const personality = option?.split("=", 2)[1]?.toLowerCase() ?? "chaotic";

  if (!(personality in FAILURE_LINES)) {
    console.warn(`Unknown personality "${personality}"; using default.`);
    return "default";
  }

  return personality;
}


function runTests() {
  return new Promise((resolve, reject) => {
    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    const tests = spawn(npmCommand, ["test"], { stdio: "inherit" });

    tests.on("error", reject);
    tests.on("close", (code) => resolve(code ?? 1));
  });
}

async function speak(text) {
  const { FISH_API_KEY, FISH_VOICE_ID } = process.env;

  if (!FISH_API_KEY || !FISH_VOICE_ID) {
    throw new Error(
      "Missing FISH_API_KEY or FISH_VOICE_ID. in .env. Please add the api keys",
    );
  }

  const client = new FishAudioClient({ apiKey: FISH_API_KEY });
  const audio = await client.textToSpeech.convert(
    {
      text,
      reference_id: FISH_VOICE_ID,
      format: "mp3",
    },
    S2_PRO_BACKEND,
  );

  await playAudio(audio);
}

async function playAudio(audio) {
  if (process.platform !== "darwin") {
    await play(audio);
    return;
  }

  const chunks = [];
  for await (const chunk of audio) {
    chunks.push(Buffer.from(chunk));
  }

  const audioPath = join(tmpdir(), `pet-feeder-narrator-${process.pid}.mp3`);
  await writeFile(audioPath, Buffer.concat(chunks));

  try {
    await new Promise((resolve, reject) => {
      const player = spawn("afplay", [audioPath], { stdio: "ignore" });
      player.on("error", reject);
      player.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`afplay exited with code ${code ?? "unknown"}.`));
      });
    });
  } finally {
    await unlink(audioPath).catch(() => {});
  }
}

async function main() {
  const personality = getPersonality(process.argv.slice(2));

  console.log("\n🐾 PET FEEDER NARRATOR");
  console.log("Running tests...\n");

  let testExitCode;
  try {
    testExitCode = await runTests();
  } catch (error) {
    console.error(`\nCould not start tests: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  const passed = testExitCode === 0;
  console.log(passed ? "\n✅ ALL TESTS PASSED" : "\n❌ TESTS FAILED");

  if (!passed) {
    const label = personality[0].toUpperCase() + personality.slice(1);
  }


  const line = passed ? SUCCESS_LINE : FAILURE_LINES[personality];
  try {
    await speak(line);
  } catch (error) {
    console.error(`⚠️  Voice response unavailable: ${error.message}`);
  }

  process.exitCode = testExitCode;
}

await main();
