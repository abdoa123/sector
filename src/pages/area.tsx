import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AreaView } from 'src/sections/area/view/area-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <AreaView />
    </>
  );
}
