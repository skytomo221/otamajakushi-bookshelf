
import { Layout } from 'otamashelf/LayoutCard';
import { BookTemplatePage, NormalPage, PageTemplatePage } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { BookTemplatePageReference, NormalPageReference, PageTemplatePageReference } from 'otamashelf/PageReference';

export interface NormalMediator {
  index: NormalPageReference & PageDisplayInformation;
  layout: Layout;
  page: NormalPage;
}

export interface BookTemplateMediator {
  index: BookTemplatePageReference;
  layout: Layout;
  page: BookTemplatePage;
}

export interface PageTemplateMediator {
  index: PageTemplatePageReference;
  layout: Layout;
  page: PageTemplatePage;
}

export function isNormalMediator(mediator: Mediator): mediator is NormalMediator {
  return mediator.index.type === 'normal';
}

export function isBookTemplateMediator(mediator: Mediator): mediator is BookTemplateMediator {
  return mediator.index.type === 'book-template';
}

export function isPageTemplateMediator(mediator: Mediator): mediator is PageTemplateMediator {
  return mediator.index.type === 'page-template';
}

export type Mediator = NormalMediator | BookTemplateMediator | PageTemplateMediator;
