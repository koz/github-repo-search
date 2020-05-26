import { useLocation, useHistory } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const [showBack, setShowBack] = useState(false);
  const isHomePage = useMemo(() => !!location.pathname.match(/^\/$/), [location.pathname]);
  const initialHistoryLength = useMemo(() => history.length, []);
  useEffect(() => {
    setShowBack(!isHomePage && history.length > initialHistoryLength);
  }, [isHomePage, initialHistoryLength, history.length]);
  const handleClick = () => history.goBack();
  return {
    state: showBack,
    handleClick,
  };
};
