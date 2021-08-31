// import React, { useRef, useState } from "react"
// import { ReactReader } from "react-reader"

// const App = () => {
//   const [page, setPage] = useState('')
//   const renditionRef = useRef(null)
//   const tocRef = useRef(null)
//   const locationChanged = (epubcifi) => {
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start
//       const chapter = tocRef.current.find((item) => item.href === href)
//       setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'}`)
//     }
//   }
  
//   return (
//     <>
//       <div style={{ height: "100vh" }}>
//         <ReactReader
//           locationChanged={locationChanged}
//           url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
//           getRendition={(rendition) => renditionRef.current = rendition}
//           tocChanged={toc => tocRef.current = toc}
//         />
//       </div>
//       <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
//         {page}
//       </div>
//     </>
//   )
// }

// export default App

// import React, { useEffect, useRef, useState } from "react"
// import { ReactReader } from "react-reader"

// const App = () => {
//   const [page, setPage] = useState('')
//   const [size, setSize] = useState(100)
//   // And your own state logic to persist state
//   const [location, setLocation] = useState(null)
//   const locationChanged = (epubcifi) => {
//     console.log(epubcifi);
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start
//       const chapter = tocRef.current.find((item) => item.href === href)
//       setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'}`)
//     }
//     // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
//     setLocation(epubcifi)
//   }
//   const renditionRef = useRef(null);
//   const tocRef = useRef(null);
//   const changeSize = (newSize) => {
//     setSize(newSize)
//   }
//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.fontSize(`${size}%`)
//     }
//   }, [size])

//   return (
//     <>
//       <div style={{ height: "100vh" }}>
//         <ReactReader
//           location={location}
//           locationChanged={locationChanged}
//           getRendition={(rendition) => {
//             renditionRef.current = rendition
//             renditionRef.current.themes.fontSize(`${size}%`)
//             console.log(rendition.book.spine);
//           }}
//           tocChanged={toc => tocRef.current = toc}
//           url="https://s3.us-west-1.amazonaws.com/playground.titanbooks.io/epub/2014_%EC%9D%B8%ED%84%B0%EB%84%B7%EC%83%81%EC%83%9D%EB%B0%B1%EC%84%9C.epub"
//         />
//       </div>
//       <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
        // <button onClick={() => changeSize(size - 10)}>-</button>
        // <span>CurrentSize: {page} Current size: {size}%</span>
        // <button onClick={() => changeSize(size + 10)}>+</button>

//       </div>
//     </>
//   )
// }

// export default App


import React, { useRef, useState, useEffect } from "react"
import { ReactReader } from "react-reader"
import styled from "styled-components"

// const url = 'https://s3.us-west-1.amazonaws.com/playground.titanbooks.io/epub/alice2.epub';
const v2_url = "https://s3.us-west-1.amazonaws.com/playground.titanbooks.io/epub/2014_%EC%9D%B8%ED%84%B0%EB%84%B7%EC%83%81%EC%83%9D%EB%B0%B1%EC%84%9C.epub";
const url = v2_url;

const App = () => {
  const [fontSize, setFontSize] = useState(100);
  const [lineHeight, setLineHeight] = useState(100);
  const [viewDirection, setViewDirection] = useState('left');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterLength, setChapterLength] = useState(1);
  const [location, setLocation] = useState(null);
  const renditionRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${fontSize}%`)
    }
  }, [fontSize])

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.default({
        'h1': {'line-height': `${lineHeight}%`},
        'h2': {'line-height': `${lineHeight}%`},
        'h3': {'line-height': `${lineHeight}%`},
        'h4': {'line-height': `${lineHeight}%`},
        'h5': {'line-height': `${lineHeight}%`},
        'p': {'line-height': `${lineHeight}%`},
      })
    }
  }, [lineHeight])

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.default({
        'h1': {'text-align': viewDirection},
        'h2': {'text-align': viewDirection},
        'h3': {'text-align': viewDirection},
        'h4': {'text-align': viewDirection},
        'h5': {'text-align': viewDirection},
        'p': {'text-align': viewDirection},
      })
    }
  }, [viewDirection])

  function init(rendition) {
    console.log('initialize:', rendition);
    rendition.themes.default({
      '::selection': {
        'background': 'orange'
      }
    })
  }

  function handleLocationChanged(epubcifi) {
    // console.log('epubCifi:', epubcifi);
    setLocation(epubcifi);

    const { start, end } = renditionRef.current.location;
    const { displayed } = start;
    const { page, total } = displayed;

    setCurrentChapter(start.index - 1);
    setCurrentPage(page);
    setCurrentTotal(total);
    
    console.log('location', renditionRef.current.location)
  }
  function handleGetRendition(rendition) {
    renditionRef.current = rendition;
    init(rendition);
  }

  function handleTocChanged(toc) {
    setChapterLength(toc.length);
    console.log('toc:', toc);
  }

  return (
    <PageWrapper>
      <RenderWrapper>
        <ReactReader url={url}
          location={location}
          locationChanged={handleLocationChanged}
          getRendition={handleGetRendition}
          tocChanged={handleTocChanged}
        />
      </RenderWrapper>

      <ButtonWrapper>
        <Buttons>
          <button onClick={() => setFontSize(fontSize - 10)}>-</button>
          <span>Current size: {fontSize}%</span>
          <button onClick={() => setFontSize(fontSize + 10)}>+</button>
        </Buttons>
        <Buttons>
          <button onClick={() => setLineHeight(lineHeight - 10)}>-</button>
          <span>Current line height: {lineHeight}%</span>
          <button onClick={() => setLineHeight(lineHeight + 10)}>+</button>
        </Buttons>
        
        <Buttons>
          <button onClick={() => setViewDirection('left')}> 좌측 정렬 </button>
          <button onClick={() => setViewDirection('center')}> 가운데 정렬 </button>
          <button onClick={() => setViewDirection('right')}> 우측 정렬 </button>
        </Buttons>

        <Buttons>
          <span>{currentChapter} ({currentPage} - {currentTotal}) / {chapterLength}</span>
        </Buttons>
      </ButtonWrapper>
    </PageWrapper>
  )
}

const ButtonWrapperHeight = '40px';
const PageWrapper = styled.div``;
const RenderWrapper = styled.div`
  height: calc(100vh - ${ButtonWrapperHeight});
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  height: ${ButtonWrapperHeight};
`;
const Buttons = styled.div`
  display: inline-block;
  height: ${ButtonWrapperHeight};
`;

export default App;