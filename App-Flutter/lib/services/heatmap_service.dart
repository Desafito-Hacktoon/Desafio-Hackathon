import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/zone_model.dart';

class HeatmapService {
  static const String _assetPath = 'assets/mock/heatmap.json';

  Future<List<ZoneModel>> loadHeatmapData() async {
    try {
      final String jsonString = await rootBundle.loadString(_assetPath);
      final Map<String, dynamic> jsonData = json.decode(jsonString);
      final List<dynamic> zonesJson = jsonData['zones'] as List<dynamic>;
      return zonesJson
          .map((zone) => ZoneModel.fromJson(zone as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw Exception('Erro ao carregar dados do mapa de calor: $e');
    }
  }

  Future<List<ZoneModel>> loadHeatmapDataByFilter(String filterType) async {
    final allZones = await loadHeatmapData();
    if (filterType == 'todos') return allZones;
    return allZones.where((zone) => zone.type == filterType).toList();
  }

  Future<List<ZoneModel>> fetchFromApi({String? filter}) async {
    await Future.delayed(const Duration(milliseconds: 500));
    if (filter != null && filter != 'todos') {
      return loadHeatmapDataByFilter(filter);
    }
    return loadHeatmapData();
  }
}
