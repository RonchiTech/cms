import { useEffect } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import ContentWrapper from '../../components/ContentWrapper';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/BlogPage.module.css';

const URL = process.env.STRAPIBASEURL;

const Content = ({ blog }) => {
  useEffect(() => {
    console.log('BLOG', blog);
  }, [blog]);
  const { title, description, blogbody, slug } = blog.attributes;
  return (
    <ContentWrapper>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className={styles.grid}>
        <h1>{title}</h1>
        <h3>{description}</h3>
        <ReactMarkdown>{blogbody}</ReactMarkdown>
      </main>
      <Footer />
    </ContentWrapper>
  );
};

export default Content;

export async function getStaticPaths() {
  const query = `{
        blogposts {
            data {
                attributes {
                    slug
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
  console.log('Data', responseData.data.blogposts.data);
  const paths = responseData.data.blogposts.data.map((post) => {
    return { params: { slug: post.attributes.slug } };
  });
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const query = `query GetBlog($slug: String!){
  blogposts(filters: {slug: {eq: $slug}}){
    data {
      attributes {
        title
        blogbody
        description
        splash {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`;
  const variables = {
    slug,
  };
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  const response = await fetch(`${URL}/graphql`, request);
  const responseData = await response.json();

  console.log('Data', responseData.data.blogposts.data);
  
  return {
    props: { blog: responseData.data.blogposts.data[0] },
    revalidate: 10,
  };
}
