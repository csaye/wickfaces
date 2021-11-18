import Image from 'next/image';
import Link from 'next/link';
import Cover from './Cover';

export default function UserCard(props) {
  const { username, firstName, lastName, year, cover } = props;

  return (
    <div>
      <Link href={`/${username}`}>
        <a>
          <p>{firstName} {lastName} &apos;{year}</p>
          <Cover image={cover} />
        </a>
      </Link>
    </div>
  );
}
