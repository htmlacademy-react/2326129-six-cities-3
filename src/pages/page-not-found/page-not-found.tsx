import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div style={{ paddingTop: '20px', paddingLeft: '100px' }}>
      <h1>
        404
        <br />
        Page not found
        <br />
        =(
      </h1>
      <Link style={{ color: 'blue' }} to='/' title='/'>Go to main page</Link>
    </div>
  );
}

export { PageNotFound };
