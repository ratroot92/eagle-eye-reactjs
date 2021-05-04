import React from 'react';
import { BoxLoading } from 'react-loadingg';
import { Tabs, Radio } from 'antd';
import FormWrapper from './FormWrapper';
import PhraseSearchForm from './PhraseSearch';
import UserPhraseSearchForm from './UsernamePhraseSearch';
import LocationPhraseSearchFrom from './LocationPhraseSearch';
const { TabPane } = Tabs;

export const TwitterRapidSerach = () => {
  const [load, setLoad] = React.useState(true);
  const [mode, setMode] = React.useState<any>('top');
  const [active, setActive] = React.useState<any>(1);

  const handleModeChange = e => {
    const mode = e.target.value;
    setMode(mode);
  };
  return (
    <div className="row">
      {load ? (
        <>
          <div className="col-md-12">
            <Radio.Group
              onChange={handleModeChange}
              value={mode}
              style={{ marginBottom: 8 }}
            >
              <Radio.Button value="top">Horizontal</Radio.Button>
              <Radio.Button value="left">Vertical</Radio.Button>
            </Radio.Group>
            <Tabs
              defaultActiveKey={active}
              tabPosition={mode}
              style={{ height: '100%' }}
              onChange={key => setActive(key)}
            >
              <TabPane tab={`Phrase Search`} key="1">
                <FormWrapper
                  title="Phrase Search"
                  ChildForm={<PhraseSearchForm />}
                />
              </TabPane>
              <TabPane tab={`User Phrase Search`} key="2">
                <FormWrapper
                  title="User Phrase Search"
                  ChildForm={<UserPhraseSearchForm />}
                />
              </TabPane>
              <TabPane tab={`Location Phrase Search`} key="3">
                <FormWrapper
                  title="Location Phrase Search"
                  ChildForm={<LocationPhraseSearchFrom />}
                />
              </TabPane>
            </Tabs>
          </div>
        </>
      ) : (
        <BoxLoading></BoxLoading>
      )}
    </div>
  );
};
export default TwitterRapidSerach;
