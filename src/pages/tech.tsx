import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TechView } from 'src/sections/techincalData/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`tech - ${CONFIG.appName}`}</title>
      </Helmet>

      <TechView />
    </>
  );
}
