import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TechView } from 'src/sections/techincalType/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`tech-view- ${CONFIG.appName}`}</title>
      </Helmet>

      <TechView />
    </>
  );
}
