export const calculatePaginationData = (count, perPage, page) => {
    const totalPages = Math.ceil(count / perPage);
    // const hasNextPage = Boolean(totalPages - page);
    // const hasPreviousPage = page !== 1;
    const currentPage = Math.min(page, totalPages);

    return {
        page: currentPage,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
};