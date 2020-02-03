import DataProvider from './DataProvider';
import TracesByFileIndex from './impl/indexes/TracesByFileIndex';
import ContextChildrenIndex from './impl/indexes/ContextChildrenIndex';
import TracesByContextIndex from './impl/indexes/TracesByContextIndex';
import TracesByStaticTraceIndex from './impl/indexes/TracesByStaticTraceIndex';

import VisitedStaticTracesByFileIndex from './impl/indexes/VisitedStaticTracesByFileIndex';

import ProgramIdByFilePathQuery from './impl/queries/ProgramIdByFilePathQuery';
import ProgramFilePathByTraceIdQuery from './impl/queries/ProgramFilePathByTraceIdQuery';
import dataProviderUtil from './dataProviderUtil';


export function newDataProvider(application) {
  const dataProvider = new DataProvider(application);
  
  // indexes
  dataProvider.addIndex(new ContextChildrenIndex());

  dataProvider.addIndex(new TracesByFileIndex());
  dataProvider.addIndex(new TracesByContextIndex());
  dataProvider.addIndex(new TracesByStaticTraceIndex());


  // complex indexes
  // NOTE: we are currently solving index dependencies by simply adding depdendents after dependees
  dataProvider.addIndex(new VisitedStaticTracesByFileIndex());


  // queries
  dataProvider.addQuery(new ProgramIdByFilePathQuery());
  dataProvider.addQuery(new ProgramFilePathByTraceIdQuery());
  

  // hackfix: add utilities
  const utilNames = Object.keys(dataProviderUtil);
  dataProvider.util = Object.fromEntries(
    utilNames.map(name => [name, dataProviderUtil[name].bind(null, dataProvider)])
  );

  return dataProvider;
}
