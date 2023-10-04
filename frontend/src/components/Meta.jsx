import { Helmet } from 'react-helmet-async'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>

    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Jalmandu',
    description: 'We sell the best water products available in the Kathmandu Valley',
    keywords: 'water, jar, container, bottle',
};

export default Meta