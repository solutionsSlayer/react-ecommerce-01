import React from 'react';
import './collection-category.styles.scss';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectShopCollection } from '../../features/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = () => {
  const { collectionId } = useParams();
  const collection = useSelector(selectShopCollection(collectionId));

  return (
    <div className='collection-page'>
      <h2 className='title'>{collection.title}</h2>
      <div className='items'>
        {collection.items.map((item) => (
          <CollectionItem
            className='collection-item'
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
