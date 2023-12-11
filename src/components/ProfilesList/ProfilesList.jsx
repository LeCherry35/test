import React, { useEffect, useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import Loader from '../Loader';
import Services from '../../services';

const ProfilesList = () => {
	const count = 6;
	const [ profiles, setProfiles ] = useState([]);
	const [nextPageLink, setNextPageLink] = useState(null);
	const [ isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);


	useEffect(()=> {
		fetchProfiles(0, count);
	},[]);    
    
	const fetchProfiles = async (offset,count) => {
		setIsLoading(true);
		setError(null);

		try {

			const res = await Services.getProfiles(offset, count);
			setProfiles([...profiles, ...res.data.users]);
			setNextPageLink(res.data.links.next_url);

		} catch(e) {

			const errorMessage = e instanceof Error ? e.message : 'Unknown Error';
			console.log(errorMessage);
			setError(errorMessage);

		} finally {

			setIsLoading(false);

		}

	};
    

	return (
		<div className='profiles-container container'>
			<h2 className='heading'>Working with GET request</h2>
			<div className='profiles-container__profiles-list' >
				{profiles.map((profile, id) => <Card {...profile} key={'profile_' + id}/>)}
			</div>
			{isLoading 
				? <Loader/>
				: nextPageLink && <Button name='Show more' onClick={() => fetchProfiles(profiles.length,count) }/>}
		</div>
	);
};

export default ProfilesList;