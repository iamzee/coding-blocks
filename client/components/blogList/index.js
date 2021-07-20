import React from 'react';

import Blog from '../blog';
import Box from '@material-ui/core/Box';

const BlogList = ({ blogs, handleDeleteBlog }) => {
	return (
		<Box
			sx={{
				'&>*': { marginBottom: '24px' },
			}}
		>
			{blogs.map(blog => (
				<Blog
					blog={blog}
					key={blog.id}
					handleDeleteBlog={handleDeleteBlog}
				/>
			))}
		</Box>
	);
};

export default BlogList;
