import Part from "./part";

const Content = ({ course }) => {
    return (
      <div>
       {course.parts.map((part,i) =>
        <Part key={i} part={part}/>
        )}
      </div>
    )
  }

  export default Content;