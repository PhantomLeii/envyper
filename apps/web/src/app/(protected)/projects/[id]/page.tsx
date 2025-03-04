import React from "react";

interface ProjectProps {
  params: {
    id: string;
  };
}

const Project = async (props: ProjectProps) => {
  const { id } = await props.params;

  return (
    <>
      <h1>Welcome to the Project Page</h1>
      <p>Project ID: {id}</p>
    </>
  );
};

export default Project;
