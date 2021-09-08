import React, { useRef, useState, useEffect } from "react"
import { ReactReader } from "react-reader"
import styled from "styled-components"

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
          <Button onClick={() => setFontSize(fontSize - 10)}>-</Button>
          <Span>Current size: {fontSize}%</Span>
          <Button onClick={() => setFontSize(fontSize + 10)}>+</Button>
        </Buttons>
        
        <Buttons>
          <Button onClick={() => setLineHeight(lineHeight - 10)}>-</Button>
          <Span>Current line height: {lineHeight}%</Span>
          <Button onClick={() => setLineHeight(lineHeight + 10)}>+</Button>
        </Buttons>
        
        <Buttons>
          <Button onClick={() => setViewDirection('left')}> 좌측 정렬 </Button>
          <Button onClick={() => setViewDirection('center')}> 가운데 정렬 </Button>
          <Button onClick={() => setViewDirection('right')}> 우측 정렬 </Button>
        </Buttons>

        <Buttons>
          <Span>Pages: {currentChapter} ({currentPage} - {currentTotal}) / {chapterLength}</Span>
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
  margin-right: 20px;
`;
const Button = styled.button``;
const Span = styled.span``;

export default App;