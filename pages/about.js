import React from 'react';
import ReactMark from 'react-markdown';
import ContentWrapper from '../components/ContentWrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css'

const URL = process.env.STRAPIBASEURL;

const About = ({ about }) => {
  return (
    <ContentWrapper>
      <Header />
      <article className={styles.content}>
        <ReactMark>{about.attributes.body}</ReactMark>
      </article>

      <Footer />
    </ContentWrapper>
  );
};

export async function getStaticProps() {
  const query = `{
    aboutcontents {
        data {
            attributes {
                body
            }
        }
    }
}`;
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  };
  const response = await fetch(`${URL}/graphql`, request);
  const responseData = await response.json();
  //   console.log('Data', responseData.data.aboutcontents.data);
  return {
    props: { about: responseData.data.aboutcontents.data[0] },
    revalidate: 10,
  };
}

export default About;
