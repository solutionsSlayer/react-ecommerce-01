import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import fetchCollectionStartAsync from '../../features/shop/shop.actions';

import CollectionPageContainer from '../collection-category/collection-category.container';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchAsyncCollections } = this.props;
    fetchAsyncCollections();
  }

  render() {
    return (
      <Routes>
        <Route index element={<CollectionOverviewContainer />} />
        <Route path=':collectionId' element={<CollectionPageContainer />} />
      </Routes>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAsyncCollections: () => dispatch(fetchCollectionStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
