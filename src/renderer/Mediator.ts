
import { Layout } from 'otamashelf/LayoutCard';
import { NormalPage } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';

export interface Mediator {
  index: NormalPageReference & PageDisplayInformation;
  layout: Layout;
  page: NormalPage;
}
