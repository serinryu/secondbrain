import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Head from '@docusaurus/Head'
import { Globe } from '@site/src/components/Globe'
import EmojiReplaceableText from '@site/src/components/EmojiReplaceableText'

import TechnologistEmoji from '@site/static/fonts/emoji/technologist.png'
import KoreaEmoji from '@site/static/fonts/emoji/korea.png'
import GlobeEmoji from '@site/static/fonts/emoji/globe.png'
import BankEmoji from '@site/static/fonts/emoji/bank.png'
import NewspaperEmoji from '@site/static/fonts/emoji/newspaper.png'
import RocketEmoji from '@site/static/fonts/emoji/rocket.png'

const HeroText = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <Head>
      <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.tagline} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.tagline} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p className={styles.intro}>
          <EmojiReplaceableText
            text={'Serin Ryu'}
            photo={TechnologistEmoji}
            photoAlt={'Serin Ryu'}
            showByDefault="emoji"
            border={true}
          />
          <> is a </>
          <EmojiReplaceableText
            text={'software engineer'}
            photo={TechnologistEmoji}
            photoAlt={'👨🏻‍💻'}
            showByDefault="emoji"
          />
          <> based in </>
          <EmojiReplaceableText
            text={'Seoul'}
            photo={KoreaEmoji}
            photoAlt={'🇰🇷'}
            showByDefault="emoji"
          />
          <> and </>
          <EmojiReplaceableText
            text={'?'}
            photo={GlobeEmoji}
            photoAlt={'🌏'}
            showByDefault="emoji"
          />
          <> . She is interested in </>
          <EmojiReplaceableText
            text={'finance'}
            photo={BankEmoji}
            photoAlt={'🏦'}
            showByDefault="emoji"
          />
          <> , </>
          <EmojiReplaceableText
            text={'business'}
            photo={NewspaperEmoji}
            photoAlt={'📰'}
            showByDefault="emoji"
          />
          <> , and </>
          <EmojiReplaceableText
            text={'technology'}
            photo={RocketEmoji}
            photoAlt={'🚀'}
            showByDefault="emoji"
          />
          <> . This is her research note about </>
          <EmojiReplaceableText
            text={'technology'}
            photo={RocketEmoji}
            photoAlt={'🚀'}
            showByDefault="emoji"
          />
          <>. It contains the ineffable and unchanging truth that transcends all concepts and language.  
          </>
          <a href='/wiki'> Stay tuned 👉🏻 </a>
        </p>
      </main>
    </>
  )
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}>
      <main className={styles.mainContainer}>
        <HeroText />
        <Globe />
      </main>
    </Layout>
  );
}
