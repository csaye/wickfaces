import Loading from './Loading';
import Post from './Post';

import { query, orderBy, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Posts.module.css';

export default function Posts(props) {
  const { postsRef, allowPosts, currUser } = props;

  // listen for posts
  const postsQuery = query(postsRef, orderBy('date', 'desc'));
  const [posts] = useCollectionData(postsQuery, { idField: 'id' });

  // return if loading posts
  if (!posts) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {
          !posts.length ?
          <p>No posts yet</p> :
          posts.map(post =>
            <Post
              post={post}
              postRef={doc(postsRef, post.id)}
              currUser={currUser}
              key={post.id}
            />
          )
        }
      </div>
    </div>
  );
}
