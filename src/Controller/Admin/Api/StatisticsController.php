<?php

namespace App\Controller\Admin\Api;

use App\Service\StatisticsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class StatisticsController
 * @package App\Controller
 * @Route("/admin/api/statistics", name="admin_api_statistics_")
 */
class StatisticsController extends AbstractController
{
    /**
     * Admin dashboard user aktuális tagság statisztika lekérdezés.
     *
     * @Route("/get-by-user-status", methods={"GET"}, name="get_by_user_status")
     *
     * @param StatisticsService $statisticsService
     * @return Response
     */
    public function dashboardStatisticsByUserStatus(StatisticsService $statisticsService): Response
    {
        $limit = new \DateTime('+2 week');
        $res = $statisticsService->getProfilesByUserStatus($limit);

        return new JsonResponse($res, Response::HTTP_OK);
    }

    /**
     * Admin dashboard T-12 havi statisztika.
     *
     * @Route("/get-by-user-history", methods={"GET"}, name="get_by_user_history")
     *
     * @param StatisticsService $statisticsService
     * @return Response
     */
    public function dashboardStatisticsByUserHistory(StatisticsService $statisticsService): Response
    {
        $res = $statisticsService->getProfilesByUserHistory();

        return new JsonResponse($res, Response::HTTP_OK);
    }
}
