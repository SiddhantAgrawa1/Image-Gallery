import PhotoAlbum from "react-photo-album";
import axios from "axios";
import { useState,useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function App() {

  const [Photos,setPhotos] = useState([])
  const [photo_limit,setPhotoLimit] = useState(30);
  
  const fetchMoreData = () => {

    setPhotoLimit(Math.round(Math.random() * 100))

    const page = Math.round(Math.random() * 10)
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${photo_limit}`
    console.log(url)
      axios.get(url).then((response) => 
      response.data.map(photo => ({src : photo.download_url,width:photo.width,height:photo.height}))
      ).then((photos) => setPhotos((old_photos) => [...old_photos,...photos]))
    }

  useEffect( () => {
    fetchMoreData()
  },[])
  //console.log(Photos);

  return (
    <InfiniteScroll
      dataLength={Photos.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>} >

      <PhotoAlbum layout="masonry" photos={Photos} />

    </InfiniteScroll>
  );
}