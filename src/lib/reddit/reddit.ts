import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { PUBLIC_CLIENT_SECRET } from '$env/static/public';
import { Jsrwrap } from 'jsrwrap';

const jsrwrap = await Jsrwrap.fromApplicationOnlyAuth({
	clientId: PUBLIC_CLIENT_ID,
	clientSecret: PUBLIC_CLIENT_SECRET,
	grantType: 'client_credentials',
	userAgent: 'web:dokusha-for-reddit:0.1.0 (by /u/blastose)'
});

export { jsrwrap };
