import React, { useState, useEffect } from 'react';

// @material
import { Grid, Container, Button } from '@material-ui/core';

// components 
import ContentItem from '../content-item';

// styles
import './content.css';

const Content = () => {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [links, setLinks] = useState([]);


  const getComments = async () => {
    const response = await fetch('https://jordan.ashton.fashion/api/goods/30/comments?page=1');
    const comment = response.json();

    return comment;
  };

  const getCommentsPage = async (url) => {
    const response = await fetch(`${url}`);
    const comment = response.json();

    return comment;
  };

  useEffect(() => {
    getComments().then(comment => {
      setData(comment.data);
      setNextPage(comment.next_page_url);
      setLinks(comment.links);
      console.log(comment.links)
    });
  }, []);

  const getNextComments = async () => {
    const response = await fetch(`${nextPage}`);
    const comment = response.json();

    return comment;
  };

  const splitNameBtn = (item, i) => {
    const items = item.split(' ');
    const nameBtn = items[i === 0 ? 1 : 0];
    const normilizeSymbol = `\//` + items[i === 0 ? 0 : 1];


    return [nameBtn, normilizeSymbol];
  }

  return (
    <Container >
      <Grid xs={12}
        container
        direction="column"
        justifyContent="center"
        alignItems="center">
        <ul className="content-list">
          {data.map(item => <ContentItem key={item.id} name={item.name} text={item.text} />)}
        </ul>
        {!!nextPage ?
          <Button variant="contained" style={{ textTransform: "uppercase", marginBottom: "20px", padding: "15px 25px" }} onClick={() => {
            getNextComments().then(comment => {
              setData(data.concat(comment.data));
              setNextPage(comment.next_page_url);
            })
          }}
          >show more</Button>
          :
          null
        }
        <Grid xs={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ margin: "0 5px" }}
        >
          {links.map((item, i) => {
            console.log("item.label", typeof item.label, item.label)
            return <button
              

              onClick={() => getCommentsPage(item.url).then(comment => {
                setData(comment.data);
                setNextPage(comment.next_page_url);
                setLinks(comment.links);

              })}> {typeof item.label === 'string' ? splitNameBtn(item.label) : item.label }
              {/* <span> {i === 0 ? splitNameBtn(item.label, i)[1] : item.url === null ? splitNameBtn(item.label, i)[1] : null}</span> {typeof item.label === 'string' ? splitNameBtn(item.label) : item.label}  */}
            </button >
          })}

        </Grid>
      </Grid>
    </Container >
  )
}

export default Content;
