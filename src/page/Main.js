import { Content, Navigation, Wrapper } from "../component";


export default function Main() {

  return (
    <Wrapper.Page>
      <Navigation.Top/>
      <Content/>
      <Navigation.Bottom/>
    </Wrapper.Page>
  )
}