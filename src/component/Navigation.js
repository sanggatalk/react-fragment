import { Asset } from "../assets";
import { PrettyConsole } from "../module";
import Wrapper from "./Wrapper";

// or import { Wrapper } from './';
// or import { TopNav } from './Wrapper'
//    and use TopNav tag. (Not Wrapper.TopNav);

class Navigation {
  static Top() {
    function handleClick(e) {
      PrettyConsole.print('TopNavigation Clicked', [
        e, e.target, e.currentTarget
      ]);
    }
    return (
      <Wrapper.TopNav onClick={handleClick}>
        <img src={Asset.Navigation.Hamburger} alt=""/>
        Top Navigation
      </Wrapper.TopNav>
    )
  }

  static Bottom() {
    return <p>Bottom Navigation</p>
  }
}

// 또는
/*

  function TopNavigation() {
    return <p>Navigation</p>
  }

  function BottomNavigation() {
    return <p>Navigation</p>
  }

  const Navigation = {
    Top: TopNavigation,
    Bottom: BottomNavigation
  }

*/


export default Navigation;

