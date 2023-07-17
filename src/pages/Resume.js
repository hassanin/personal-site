// import React from 'react';
// import { Link } from 'react-router-dom';

// import Main from '../layouts/Main';

// import Education from '../components/Resume/Education';
// import Experience from '../components/Resume/Experience';
// import Skills from '../components/Resume/Skills';
// import Courses from '../components/Resume/Courses';
// import References from '../components/Resume/References';

// import courses from '../data/resume/courses';
// import degrees from '../data/resume/degrees';
// import work from '../data/resume/work';
// import { skills, categories } from '../data/resume/skills';

// // NOTE: sections are displayed in order defined.
// const sections = {
//   Education: () => <Education data={degrees} />,
//   Experience: () => <Experience data={work} />,
//   Skills: () => <Skills skills={skills} categories={categories} />,
//   Courses: () => <Courses data={courses} />,
//   References: () => <References />,
// };

// const Resume = () => (
//   <Main
//     title="Resume"
//     description="Mohamed Hassanin"
//   >
//     <article className="post" id="resume">
//       <header>
//         <div className="title">
//           <h2><Link to="resume">Resume</Link></h2>
//           <div className="link-container">
//             {Object.keys(sections).map((sec) => (
//               <h4 key={sec}>
//                 <a href={`#${sec.toLowerCase()}`}>{sec}</a>
//               </h4>))}
//           </div>
//         </div>
//       </header>
//       {Object.entries(sections).map(([name, Section]) => (
//         <Section key={name} />
//       ))}
//     </article>
//   </Main>
// );

// export default Resume;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const Resume = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/resume.md')
      .then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdown);
      });
  });

  const count = markdown.split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main
      title="About"
      description="Learn about Mohamed Hassanin"
    >
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2><Link to="/about">About Me</Link></h2>
            <p>(in about {count} words)</p>
          </div>
        </header>
        <Markdown>
          {markdown}
        </Markdown>
      </article>
    </Main>
  );
};

export default Resume;
