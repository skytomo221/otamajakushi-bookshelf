
import { Layout } from 'otamashelf/LayoutCard';
import { NormalPage } from 'otamashelf/Page';
import { PageProperties } from 'otamashelf/PageProperties';

export interface Mediator {
  pageProperties: PageProperties;
  layout: Layout;
  page: NormalPage;
}
