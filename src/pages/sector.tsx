import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SectorView } from 'src/sections/sector/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <SectorView />
    </>
  );
}
