import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CentralView } from 'src/sections/central/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`User - ${CONFIG.appName}`}</title>
      </Helmet>

      <CentralView />
    </>
  );
}
