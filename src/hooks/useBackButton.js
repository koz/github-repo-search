import { useLocation, useHistory } from 'react-router-dom';
import { useState, useMemo, useEffect, useRef } from 'react';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const [showBack, setShowBack] = useState(false);
  const isHomePage = useMemo(() => !!location.pathname.match(/^\/$/), [location.pathname]);
  const initialHistoryLength = useRef(history.length);
  useEffect(() => {
    setShowBack(!isHomePage && history.length > initialHistoryLength.current);
  }, [isHomePage, history.length]);
  const handleClick = () => history.goBack();
  return {
    state: showBack,
    handleClick,
  };
};
