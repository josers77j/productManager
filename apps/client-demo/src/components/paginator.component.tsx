// Paginator.tsx
import React from 'react';
import {
  Button,
  Flex,
  IconButton,
  Select,
  Text,
  Spacer,
} from '@chakra-ui/react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

type Meta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};

interface PaginatorProps {
  meta: Meta;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ meta, onPageChange, onPerPageChange }) => {
  return (
    <Flex mt={4} alignItems="center" flexWrap="wrap">
      <Button
        onClick={() => onPageChange(1)}
        disabled={meta.currentPage === 1}
        leftIcon={<FaAngleDoubleLeft />}
      />

      <IconButton
        icon={<FaChevronLeft />}
        onClick={() => onPageChange(meta.currentPage - 1)}
        disabled={!meta.prev}
        aria-label="Previous Page"
        mx={2}
      />
            <IconButton
        icon={<FaChevronRight />}
        onClick={() => onPageChange(meta.currentPage + 1)}
        disabled={!meta.next}
        aria-label="Next Page"
        mx={2}
      />
      <Button
        onClick={() => onPageChange(meta.lastPage)}
        disabled={meta.currentPage === meta.lastPage}
        rightIcon={<FaAngleDoubleRight />}
      />
      <Text>
        Página <strong>{meta.currentPage} de {meta.lastPage}</strong>
      </Text>


      <Spacer />
      <Text>
        Total de usuarios: <strong>{meta.total}</strong>
      </Text>
      <Spacer />
      <Select
        value={meta.perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        width="auto"
        ml={4}
      >
        <option value={5}>5 por página</option>
        <option value={10}>10 por página</option>
        <option value={20}>20 por página</option>
        <option value={50}>50 por página</option>
      </Select>
    </Flex>
  );
};

export default Paginator;
