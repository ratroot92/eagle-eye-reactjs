import React from 'react';
import { BoxLoading } from 'react-loadingg';
import { Tabs, Radio } from 'antd';
import FormWrapper from '../RapidSearch/FormWrapper';
import TwitterProfileTargets from './TwitterProfileTargets';
import TwitterTweetsTargets from './TwitterTweetsTargets';
import { History, LocationState } from 'history';
const { TabPane } = Tabs;
interface IComponentProps {
  someOfYourOwnProps: any;
  history: History<LocationState>;
  someMorePropsIfNeedIt: any;
}
export const TwitterCrawler = (props: IComponentProps) => {
  const [load, setLoad] = React.useState(true);
  const [mode, setMode] = React.useState<any>('top');
  const [active, setActive] = React.useState<any>(1);

  const handleModeChange = e => {
    const mode = e.target.value;
    setMode(mode);
  };
  return (
    <div className="row h-100 ">
      {load ? (
        <>
          <div className="col-md-12 ">
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
              <TabPane tab={`Twitter Tweets Targets`} key="1">
                <FormWrapper
                  title="Twitter Tweets Targets"
                  ChildForm={<TwitterTweetsTargets {...props} />}
                />
              </TabPane>

              <TabPane tab={`Twitter Profile Targets`} key="2">
                <FormWrapper
                  title="Twitter Profile Targets"
                  ChildForm={<TwitterProfileTargets {...props} />}
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
export default TwitterCrawler;
