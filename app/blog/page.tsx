import Link from "next/link";

export default async () => {
  const blogs = [
    { title: "hello", content: "I am the bomb", id: "123" },
    { title: "cool", content: "I am the coolest", id: "456" },
  ];
  return (
    <div>
      <h1>List of Blogs</h1>
      <ul>
        {blogs.map(({ title, content, id }) => {
          return (
            <li>
              <Link href={`/blog/${id}`}>
                <h2>{title}</h2>
              </Link>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
