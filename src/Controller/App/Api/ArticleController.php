<?php

namespace App\Controller\App\Api;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ContentController
 * @package App\Controller\Api
 * @Route("/api/article", name="api_content_")
 */
class ArticleController extends AbstractController
{
    /**
     * @Route("/{title}", methods={"GET"}, name="get")
     *
     * @param string $title
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function getArticle(string $title, EntityManagerInterface $em): Response
    {
        /* @var $article Article */
        $article = $em
          ->getRepository(Article::class)
          ->findOneBy([
            'title' => $title
          ]);

        if (!$article) {
            return new JsonResponse([], Response::HTTP_NO_CONTENT);
        }

        return new JsonResponse($article->getArticle(), Response::HTTP_OK);
    }
}
