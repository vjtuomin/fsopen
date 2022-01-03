import Header from './header'
import Content from './content';
import Total from './total';

const Course = ({courses}) => {
    return (
      courses.map(course =>
      <div key={course.id}>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
      )
    )
  }

  export default Course;