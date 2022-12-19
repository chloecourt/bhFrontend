const getBlog = async (id: string) => {
  return id;
};

export default async ({ params }: any) => {
  const blog = await getBlog(params.id);

  return (
    <div>
      <h1>This is blog: {blog}</h1>
    </div>
  );
};
