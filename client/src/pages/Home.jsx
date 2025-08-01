import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import SearchBar from "../Components/SearchBar";
import ImageCard from "../Components/ImageCard";
import { CircularProgress } from "@mui/material";
import { GetPosts } from "../api";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsData = await GetPosts();
        setPosts(postsData.reverse() || []);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError(err?.response?.data?.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Memoized Search Filter
  const filteredPosts = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return posts.filter((post) =>
      (post?.prompt || "").toLowerCase().includes(searchTerm) ||
      (post?.name || "").toLowerCase().includes(searchTerm)
    );
  }, [posts, search]);

  return (
    <Container>
      <Headline>
        Explore popular posts in the Community!
        <Span>⦿ Generated with AI ⦿</Span>
      </Headline>
      <SearchBar search={search} setSearch={setSearch} />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPosts.length === 0 && !loading && !error ? (
              <>No Posts Found</>
            ) : (
              filteredPosts.map((item, index) => (
                <ImageCard
                  key={index}
                  item={{
                    ...item,
                    photo: item?.photo || "/fallback-image.jpg", // Ensure fallback image
                  }}
                />
              ))
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
