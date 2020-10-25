import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
  // here I will use hook and pass collection name.
  const { docs } = useFirestore('images');

  return (
    <div className="img-grid">
      {/* if docs is exit if yes and map all document */}
      {docs && docs.map(doc => (
        // motion.div is a framer-motion module for add some motion effect 
        <motion.div className="img-wrap" key={doc.id}
          layout
          whileHover={{ opacity: 1 }} s
          onClick={() => setSelectedImg(doc.url)}
        >
          <motion.img src={doc.url} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid;