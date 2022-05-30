import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import Loader from 'shared/components/Loader';

import styles from './imageFinder.module.css';
import { getImages } from 'shared/API/pxb';

class ImageFinder extends Component {
  state = {
    q: '',
    items: [],
    isLoading: false,
    page: 1,
    error: null,
    isModalOpen: false,
    modalData: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;

    if (prevState.q !== q || page > prevState.page) {
      this.setState({
        isLoading: true,
      });

      try {
        const items = await getImages(q, page);
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...items],
            isLoading: false,
          };
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          error: error.message,
        });
      }
    }
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  setQuery = q => {
    this.setState({ q, page: 1, items: [] });
  };

  onFormSubmit = e => {
    e.preventDefault();
  };

  showModal = modalData => {
    this.setState({
      isModalOpen: true,
      modalData,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { items, isLoading, isModalOpen, modalData } = this.state;
    const { setQuery, loadMore, showModal, closeModal } = this;

    return (
      <div className={styles.ImageFinder}>
        <Searchbar onSubmit={setQuery} />
        {Boolean(items.length) && (
          <ImageGallery items={this.state.items} onClick={showModal}>
            <Button text="Load More" loadMore={loadMore} />
          </ImageGallery>
        )}
        {isModalOpen && (
          <Modal close={closeModal}>
            <img src={modalData} alt="sorry" />
          </Modal>
        )}
        {isLoading && <Loader isEnabled={isLoading} />}
      </div>
    );
  }
}

export default ImageFinder;
