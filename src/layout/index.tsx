import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const DefaultLayout: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer>
      123123
    </PageContainer>
  );
};

export default DefaultLayout;
