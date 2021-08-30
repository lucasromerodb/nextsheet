import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { getDataFromSheets } from "./api/sheets";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextsheet 💩</title>
        <meta
          name="description"
          content="Connecting NextJS with Google Spreadsheets as Database"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Nextsheet 💩</h1>
        <p>Connecting NextJS with Google Spreadsheets as Database</p>
        <p>Example fetched from Google Spreadsheet:</p>
        <ul>
          {data && data.length ? (
            data.map((item) => (
              <li key={item}>
                {item.title} - {item.description}
              </li>
            ))
          ) : (
            <li>Error: do not forget to setup your env variables 👇</li>
          )}
        </ul>
        <h2>Setting up environment variables</h2>
        <code>GOOGLE_SHEETS_PRIVATE_KEY=[YOUR KEY]</code>
        <br />

        <code>GOOGLE_SHEETS_CLIENT_EMAIL=[YOUR ACCOUNT EMAIL]</code>
        <br />
        <code>SPREADSHEET_ID=[YOU CAN GET THIS ON URL OF YOUR SHEETS]</code>
        <br />
        <code>SPREADSHEET_NAME=[SHEET NAME]</code>
        <p>
          <a href="https://github.com/lucasromerodb/nextsheet">GitHub repo »</a>
          <br />
        </p>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const sheet = await getDataFromSheets();
  return {
    props: {
      data: sheet.slice(0, sheet.length), // remove sheet header
    },
    revalidate: 1, // In seconds
  };
}
