# react-fragment

react-fragment for numerous project.

## Directory Structure Intro

```bash
  ├─assets        => static 파일들 저장 및 객체 화 (Hamburger.svg, tree.jpeg, ...)
  ├─component     => page를 이루는 기본 단위 (Navigation Bar, Content Viewer, ...)
  ├─module        => components 들이 이용할 기본 로직들 (서버 연결, 세션 관리, ...)
  └─page          => components 들을 이용하여 하나의 페이지 구현 (Main Page, Profile Page, Content Page, ...)
```

### Assets

Asset에는 자주 사용되는 정적인 파일만 저장을 한다. 파일 사이즈가 너무 크거나 자주 변하는 이미지나 폰트인 경우엔 s3와 같은 스토리지를 이용하여 외부 참조를 하는 것으로 처리한다. 파일이 너무 많아 질 경우 처리하기가 힘드니, index.js에서 용도에 맞게 객체 분리를 진행한다. 그래도 너무 많아지면 하위 폴더를 생성해 처리한다.

### Component

Page를 이루는 기본 단위들을 만든다. 각각의 Component들은 최소 단위 일 수도 있고, 아닐 수도 있다. Component 내부에서도 서로간의 참조가 가능하다는 얘기이다. 예를들어 Img 라는 component를 만들면, navigation bar에도 Img 로 들어갈 수도 있고, Content Viewer 에서도 Img로 들어갈 수가 있다. 최소 단위의 종류가 너무 많아 지게 되면 하위 폴더를 만들거나, Component 와 동일한 레벨의 디렉토리를 하나 더 생성하여, 최소 단위들만 따로 분리를 한다.

### Module

기본적인 로직들을 만든다. Component 들이 직접 window 객체나 document 객체에 접근하는 일은 최대한 삼가해야 한다. 프로젝트가 커지면 커질수록 관리하기가 힘들다. 모든 useEffect나 useState 같은 React 기능들을 제외하고, 기본적인 js 기능들은 모두 Module 에서 구현을 한 뒤에, import 하는 식으로 처리를 한다. (예시로 Console 찍는 모듈도 Module 디렉토리에 생성이 되어있다.)

### Page

하나의 페이지씩 만든다. 해당 페이지에서는 Component에 존재하는 Element 들을 엮는 작업들만 하며, 그 외에 로직적인 부분은 하나도 다루지 않는다. Component 간의 데이터 전달 또한 하지 않는다. 예를들어 Navigation Bar와 Content Viewer가 데이터를 주고받아야 하는 일이 있다면, 그건 Navigation Bar와 Content Viewer를 합친 Component를 하나 더 만들어서 처리를 해야 하며, Page 에서 그 데이터를 연결해주는 작업이 있으면 안된다. Page는 Module 과 Asset의 참조 없이 Component 의 참조만을 가지고 진행이 되어야 한다. (간혹 url을 직접 다루는 일이 예외는 있다.)
