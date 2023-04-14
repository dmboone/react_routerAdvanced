import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher(); // use when you wanna trigger an action or loader w/o actually navigating to the page to which the action or loader belongs
  // like sending your requests behind the scenes
  const {data, state} = fetcher;

  useEffect(() => {
    if(state === 'idle' && data && data.message){
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="POST" action="/newsletter" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;