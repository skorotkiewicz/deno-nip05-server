import { Head } from "$fresh/runtime.ts";
import Zaps from "../islands/Zaps.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nip05 Server @sekor.eu.org</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <main>
        <div>
          <h3>Free NIP-05 identity service</h3>
          <Zaps />
        </div>
      </main>

      <footer>
        build with Deno Fresh{" "}
        <a
          href="https://github.com/skorotkiewicz/deno-nip05-server"
          target="_blank"
        >
          opensource
        </a>
      </footer>
    </>
  );
}
