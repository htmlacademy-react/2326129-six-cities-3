import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const phrases = {
  page: {text: 'Page Not Found', o: '⚠️'},
  offer: {text: 'We don\'t have any offers with that ID', o: '🤔'}
};

type PageNotFoundProps = {
  type: keyof typeof phrases;
}

function PageNotFound({type}: PageNotFoundProps): JSX.Element {
  return (

    <div style={{ paddingTop: '20px', paddingLeft: '100px' }}>
      <Helmet>
        <title>6 cities: not found</title>
      </Helmet>
      <h1>
        404
        <br />
        {phrases[type].text}
        {phrases[type].o}
      </h1>
      <Link style={{ color: 'blue' }} to='/' title='/'>Go to main page</Link>
    </div>
  );
}

export { PageNotFound };
