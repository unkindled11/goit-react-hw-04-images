import { useState, useEffect } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import Loader from 'shared/components/Loader';

import styles from './imageFinder.module.css';
import { searchImages } from 'shared/API/pxb';

const ImageFinder = () => {
  const [images, setImages] = useState({
    items: [],
    loading: false,
    error: null,
  });

  const [modal, setModal] = useState({
    isModal: false,
    modalBody: {},
  });

  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getImages = async () => {
      if (!q) {
        return;
      }
      setImages(prevState => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      try {
        const items = await searchImages(q, page);

        setImages(prevState => ({
          ...prevState,
          items: [...prevState.items, ...items],
          loading: false,
        }));
      } catch (error) {
        setImages({
          loading: false,
          error: error.message,
        });
      }
    };

    if (q !== '') {
      getImages();
    }
  }, [q, page]);

  const setSearch = ({ q }) => {
    setQ(q);
    setPage(1);
    setImages({
      ...images,
      items: [],
    });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = modalBody => {
    setModal({
      isModal: true,
      modalBody,
    });
  };

  const closeModal = () => {
    setModal({
      isModal: false,
    });
  };

  const { items, loading } = images;
  const { modalBody, isModal } = modal;

  return (
    <div className={styles.ImageFinder}>
      <Searchbar onSubmit={setSearch} />
      {Boolean(items.length) && (
        <ImageGallery items={items} onClick={showModal}>
          <Button text="Load More" loadMore={loadMore} />
        </ImageGallery>
      )}
      {isModal && (
        <Modal close={closeModal}>
          <img src={modalBody} alt="sorry" />
        </Modal>
      )}
      {loading && <Loader isEnabled={loading} />}
    </div>
  );
};

export default ImageFinder;
